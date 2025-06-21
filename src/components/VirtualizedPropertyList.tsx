/**
 * VIRTUALIZED PROPERTY LIST - MEMORY OPTIMIZATION
 * 
 * Handles thousands of properties efficiently using virtualization.
 * Only renders visible items to reduce memory usage and improve performance.
 */

import React, { useMemo } from 'react';
import { useVirtualization } from '../hooks/useVirtualization';
import OptimizedPropertyCard from './OptimizedPropertyCard';
import { Property } from '../types';

interface VirtualizedPropertyListProps {
  properties: Property[];
  onViewDetails?: (property: Property) => void;
  onToggleFavorite?: (propertyId: string) => void;
  favorites?: Set<string>;
  containerHeight?: number;
  itemHeight?: number;
}

const VirtualizedPropertyList: React.FC<VirtualizedPropertyListProps> = ({
  properties,
  onViewDetails,
  onToggleFavorite,
  favorites = new Set(),
  containerHeight = 600,
  itemHeight = 320
}) => {
  const {
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll
  } = useVirtualization({
    items: properties,
    itemHeight,
    containerHeight,
    overscan: 3
  });

  // Memoize grid calculation
  const gridConfig = useMemo(() => {
    const columns = window.innerWidth >= 1280 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const itemsPerRow = Math.ceil(visibleItems.length / columns);
    return { columns, itemsPerRow };
  }, [visibleItems.length]);

  return (
    <div 
      className="relative overflow-auto"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      {/* Total height container */}
      <div style={{ height: totalHeight, position: 'relative' }}>
        {/* Visible items container */}
        <div 
          style={{ 
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {visibleItems.map((property) => (
              <OptimizedPropertyCard
                key={property.id}
                property={property}
                onViewDetails={onViewDetails}
                onToggleFavorite={onToggleFavorite}
                isFavorite={favorites.has(property.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualizedPropertyList;