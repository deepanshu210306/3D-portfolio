import React from 'react';
import HoverTooltip from './HoverTooltip';

const SectionTitle = ({ icon: Icon, title, kicker, english }) => (
  <>
    {Icon && <Icon className="title-icon" size={32} />}
    <HoverTooltip label={english} className="section-title-label">
      {title}
    </HoverTooltip>
    <HoverTooltip label={english} className="section-title-kicker section-title-kicker--tip">
      {kicker}
    </HoverTooltip>
  </>
);

export default SectionTitle;
