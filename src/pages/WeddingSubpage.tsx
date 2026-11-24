import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import WeddingTemplatePage from '../components/WeddingTemplatePage';

// URL slug (lower-cased) -> content key. "/wedding/Indian" is the published URL.
const typeToContentKey: Record<string, string> = {
  'algarve': 'wedding_subpages.algarve',
  'elopement': 'wedding_subpages.elopement',
  'indian': 'wedding_subpages.indian',
  'jewish': 'wedding_subpages.jewish',
};

const WeddingSubpage: React.FC = () => {
  const { weddingType } = useParams<{ weddingType: string }>();
  const slug = (weddingType ?? '').toLowerCase();
  const contentKey = typeToContentKey[slug];

  if (!contentKey) return <Navigate to="/wedding/algarve" replace />;

  // The Algarve page is the main weddings page, so it also lists the wedding types.
  return <WeddingTemplatePage key={contentKey} contentKey={contentKey} showWeddingTypes={slug === 'algarve'} />;
};

export default WeddingSubpage;
