import React from 'react';

const SectionTitle = ({ icon: Icon, title, kicker }) => (
  <>
    {Icon && <Icon className="title-icon" size={32} />}
    {title}
    <span className="section-title-kicker">{kicker}</span>
  </>
);

export default SectionTitle;
