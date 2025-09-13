# Agricultural Technology Platform Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern agricultural and productivity platforms like FarmLogs, Climate FieldView, and John Deere Operations Center, combined with clean dashboard interfaces like Linear and Notion.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Forest Green: 140 60% 35% (main brand color)
- Sage Green: 120 25% 60% (secondary)
- Earth Brown: 25 40% 30% (accent)

**Supporting Colors:**
- Background Light: 120 15% 96%
- Background Dark: 140 20% 8%
- Success Green: 140 70% 45%
- Warning Amber: 45 85% 60%
- Error Red: 0 70% 50%

### Typography
- **Primary Font**: Inter (clean, readable for data)
- **Accent Font**: Outfit (for headings and CTAs)
- **Hierarchy**: text-4xl/3xl for heroes, text-xl/lg for section headers, text-base for body

### Layout System
**Spacing Units**: Consistent use of Tailwind units 2, 4, 6, 8, 12, 16
- Tight spacing: p-2, m-4
- Standard spacing: p-4, m-6, gap-6
- Generous spacing: p-8, m-12, gap-8

### Component Library

#### Navigation
- Sidebar navigation with agricultural icons (leaf, chart, camera, message)
- Top header with search, notifications, and profile dropdown
- Mobile: Bottom tab navigation

#### Dashboard Cards
- Weather widget with current conditions and 5-day forecast
- News feed cards with image thumbnails and source attribution
- Price trend charts with commodity icons
- Plant growth progress cards with status indicators

#### Forms & Inputs
- Upload zones for disease detection images with drag-drop styling
- Chat interface with message bubbles and typing indicators
- Agricultural data input forms with field validation
- Date pickers for planting/harvest schedules

#### Data Visualization
- Line charts for price trends and growth tracking
- Progress bars for crop development stages
- Weather condition icons and temperature displays
- Market price comparison tables

### Visual Treatments

#### Gradients
- Hero sections: Subtle green gradient (140 40% 20% to 140 60% 35%)
- Card highlights: Light sage gradient overlays
- Button backgrounds: Forest to sage green gradients

#### Layout Strategy
- **Dashboard**: Grid-based layout with responsive cards
- **Disease Detection**: Center-focused upload area with results panel
- **Chat**: Full-height conversation view with input at bottom
- **Price Tracker**: Table/chart hybrid with filtering options
- **Growth Tracker**: Timeline-based progress view

### Images
**Hero Images**: Large agricultural landscape photos on landing sections
**Component Images**: 
- Crop/plant thumbnails in growth tracker
- Disease reference images in detection results
- Weather condition illustrations
- Profile placeholder avatars

**Image Placement**:
- Dashboard: Small thumbnails in news cards
- Disease Detection: Large preview area for uploaded images
- Growth Tracker: Progress photos and crop type illustrations
- No large hero image - focus on functional dashboard layout

### Key Principles
1. **Agricultural Context**: Earth tones with growth-focused green palette
2. **Data Clarity**: Clean typography and organized information hierarchy
3. **Mobile-First**: Responsive design prioritizing mobile farmers
4. **Trust & Reliability**: Professional appearance with clear data sources
5. **Efficiency**: Quick access to critical information and tools

The design emphasizes functionality over flashy aesthetics, reflecting the practical needs of agricultural users while maintaining a modern, professional appearance.