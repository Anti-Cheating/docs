import { loader } from 'fumadocs-core/source';
import { docs } from '@/.source/server';

export const source = loader({
  // Dedicated docs subdomain → docs live at the root (Introduction is the home
  // page). e.g. docs.trueyy.com/ , /quickstart , /node/webhooks
  baseUrl: '/',
  source: docs.toFumadocsSource(),
});
