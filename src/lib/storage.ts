/**
 * SUPABASE STORAGE UTILITIES
 * 
 * Helper functions for managing file uploads and storage in Supabase.
 * Handles property images, user avatars, and other file operations.
 * 
 * KEY FEATURES:
 * - Property image upload and management
 * - Image optimization and resizing
 * - File validation and security
 * - URL generation for stored files
 * - Error handling and retry logic
 */

import { supabase } from './supabase';

/**
 * STORAGE BUCKET CONFIGURATION
 */
export const STORAGE_BUCKETS = {
  PROPERTY_IMAGES: 'property-images',
  USER_AVATARS: 'user-avatars'
} as const;

/**
 * FILE UPLOAD CONFIGURATION
 */
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  MAX_IMAGES_PER_PROPERTY: 10
} as const;

/**
 * UPLOAD PROPERTY IMAGE
 * 
 * Uploads an image file to the property-images bucket.
 * 
 * @param file - The image file to upload
 * @param propertyId - The property ID this image belongs to
 * @param userId - The user ID of the property owner
 * @returns Promise with the uploaded file path and public URL
 */
export const uploadPropertyImage = async (
  file: File,
  propertyId: string,
  userId: string
): Promise<{ path: string; url: string }> => {
  try {
    // Validate file
    if (!UPLOAD_CONFIG.ALLOWED_IMAGE_TYPES.includes(file.type)) {
      throw new Error('Invalid file type. Please upload JPEG, PNG, WebP, or GIF images.');
    }

    if (file.size > UPLOAD_CONFIG.MAX_FILE_SIZE) {
      throw new Error(`File size too large. Maximum size is ${UPLOAD_CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB.`);
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${userId}/${propertyId}/${fileName}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKETS.PROPERTY_IMAGES)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKETS.PROPERTY_IMAGES)
      .getPublicUrl(filePath);

    return {
      path: filePath,
      url: urlData.publicUrl
    };
  } catch (error) {
    console.error('Error uploading property image:', error);
    throw error;
  }
};

/**
 * DELETE PROPERTY IMAGE
 * 
 * Deletes an image from the property-images bucket.
 * 
 * @param filePath - The path of the file to delete
 * @returns Promise indicating success or failure
 */
export const deletePropertyImage = async (filePath: string): Promise<void> => {
  try {
    const { error } = await supabase.storage
      .from(STORAGE_BUCKETS.PROPERTY_IMAGES)
      .remove([filePath]);

    if (error) {
      throw new Error(`Delete failed: ${error.message}`);
    }
  } catch (error) {
    console.error('Error deleting property image:', error);
    throw error;
  }
};

/**
 * GET PROPERTY IMAGES
 * 
 * Lists all images for a specific property.
 * 
 * @param userId - The user ID of the property owner
 * @param propertyId - The property ID
 * @returns Promise with array of image objects
 */
export const getPropertyImages = async (
  userId: string,
  propertyId: string
): Promise<Array<{ name: string; url: string; path: string }>> => {
  try {
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKETS.PROPERTY_IMAGES)
      .list(`${userId}/${propertyId}`, {
        limit: UPLOAD_CONFIG.MAX_IMAGES_PER_PROPERTY,
        sortBy: { column: 'created_at', order: 'asc' }
      });

    if (error) {
      throw new Error(`Failed to list images: ${error.message}`);
    }

    return data.map(file => {
      const filePath = `${userId}/${propertyId}/${file.name}`;
      const { data: urlData } = supabase.storage
        .from(STORAGE_BUCKETS.PROPERTY_IMAGES)
        .getPublicUrl(filePath);

      return {
        name: file.name,
        path: filePath,
        url: urlData.publicUrl
      };
    });
  } catch (error) {
    console.error('Error getting property images:', error);
    throw error;
  }
};

/**
 * UPLOAD MULTIPLE PROPERTY IMAGES
 * 
 * Uploads multiple images for a property in parallel.
 * 
 * @param files - Array of image files to upload
 * @param propertyId - The property ID
 * @param userId - The user ID of the property owner
 * @param onProgress - Optional progress callback
 * @returns Promise with array of uploaded file info
 */
export const uploadMultiplePropertyImages = async (
  files: File[],
  propertyId: string,
  userId: string,
  onProgress?: (progress: number) => void
): Promise<Array<{ path: string; url: string }>> => {
  try {
    if (files.length > UPLOAD_CONFIG.MAX_IMAGES_PER_PROPERTY) {
      throw new Error(`Too many images. Maximum ${UPLOAD_CONFIG.MAX_IMAGES_PER_PROPERTY} images allowed per property.`);
    }

    const uploadPromises = files.map(async (file, index) => {
      try {
        const result = await uploadPropertyImage(file, propertyId, userId);
        
        // Update progress
        if (onProgress) {
          const progress = ((index + 1) / files.length) * 100;
          onProgress(progress);
        }
        
        return result;
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
        throw error;
      }
    });

    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    throw error;
  }
};

/**
 * CONVERT FILE TO BASE64
 * 
 * Converts a file to base64 data URL for preview purposes.
 * 
 * @param file - The file to convert
 * @returns Promise with base64 data URL
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * VALIDATE IMAGE FILE
 * 
 * Validates an image file before upload.
 * 
 * @param file - The file to validate
 * @returns Validation result with error message if invalid
 */
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  if (!UPLOAD_CONFIG.ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload JPEG, PNG, WebP, or GIF images.'
    };
  }

  if (file.size > UPLOAD_CONFIG.MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size too large. Maximum size is ${UPLOAD_CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB.`
    };
  }

  return { valid: true };
};

/**
 * GET STORAGE URL
 * 
 * Generates a public URL for a stored file.
 * 
 * @param bucket - The storage bucket name
 * @param path - The file path
 * @returns Public URL for the file
 */
export const getStorageUrl = (bucket: string, path: string): string => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

/**
 * CLEANUP ORPHANED IMAGES
 * 
 * Removes images that are no longer referenced by any property.
 * This should be run periodically as a cleanup job.
 * 
 * @param userId - The user ID to clean up images for
 * @returns Promise with cleanup results
 */
export const cleanupOrphanedImages = async (userId: string): Promise<{ deleted: number }> => {
  try {
    // Get all user's images from storage
    const { data: folders, error: listError } = await supabase.storage
      .from(STORAGE_BUCKETS.PROPERTY_IMAGES)
      .list(userId);

    if (listError) {
      throw new Error(`Failed to list folders: ${listError.message}`);
    }

    // Get all user's properties from database
    const { data: properties, error: dbError } = await supabase
      .from('properties')
      .select('id, images')
      .eq('owner_id', userId);

    if (dbError) {
      throw new Error(`Failed to get properties: ${dbError.message}`);
    }

    // Find orphaned folders (property IDs that no longer exist)
    const propertyIds = new Set(properties?.map(p => p.id) || []);
    const orphanedFolders = folders?.filter(folder => !propertyIds.has(folder.name)) || [];

    let deletedCount = 0;

    // Delete orphaned folders
    for (const folder of orphanedFolders) {
      const { data: files } = await supabase.storage
        .from(STORAGE_BUCKETS.PROPERTY_IMAGES)
        .list(`${userId}/${folder.name}`);

      if (files && files.length > 0) {
        const filePaths = files.map(file => `${userId}/${folder.name}/${file.name}`);
        const { error: deleteError } = await supabase.storage
          .from(STORAGE_BUCKETS.PROPERTY_IMAGES)
          .remove(filePaths);

        if (!deleteError) {
          deletedCount += files.length;
        }
      }
    }

    return { deleted: deletedCount };
  } catch (error) {
    console.error('Error cleaning up orphaned images:', error);
    throw error;
  }
};

export default {
  uploadPropertyImage,
  deletePropertyImage,
  getPropertyImages,
  uploadMultiplePropertyImages,
  fileToBase64,
  validateImageFile,
  getStorageUrl,
  cleanupOrphanedImages,
  STORAGE_BUCKETS,
  UPLOAD_CONFIG
};