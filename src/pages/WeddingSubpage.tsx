import React from 'react';
import { useParams } from 'react-router-dom';
import WeddingTemplatePage from '../components/WeddingTemplatePage';

const typeToContentKey: Record<string, string> = {
  'wedding-in-marrakech': 'wedding_page',
  'agafay-desert': 'wedding_subpages.agafay',
  'elopement': 'wedding_subpages.elopement',
  'kerala': 'wedding_subpages.kerala',
  'jewish': 'wedding_subpages.jewish',
};

const WeddingSubpage: React.FC = () => {
  const { weddingType } = useParams<{ weddingType: string }>();
  const contentKey = typeToContentKey[weddingType ?? ''] ?? 'wedding_page';

  return <WeddingTemplatePage contentKey={contentKey} />;
};

export default WeddingSubpage;
