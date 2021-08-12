import React from 'react';
import { graphql } from 'gatsby';

import ProductGrid from '../components/ProductGrid';
import SEO from '../components/SEO';

function CollectionPage({ data: { collection } }) {
  if (!collection) return null;

  return (
    <React.Fragment>
      <SEO pageTitle={collection.name} />
      <h1 className="font-bold text-3xl md:text-6xl mb-3 text-primary">
        {collection.name}
      </h1>
      <hr className="border-b border-gainsboro w-10" />

      <ProductGrid products={collection.products} />
    </React.Fragment>
  );
}

export const pageQuery = graphql`
  query CollectionQuery($slug: String!, $locale: GraphCMS_Locale!) {
    collection: graphCmsCollection(
      locale: { eq: $locale }
      slug: { eq: $slug }
    ) {
      name
      slug
      products {
        id
        description {
          markdown
        }
        name
        printfulProductId
        printfulProduct {
          productImage {
            childImageSharp {
              fluid(maxWidth: 560) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          variants {
            formattedPrice
            retail_price
          }
        }
        remoteId
      }
    }
  }
`;

export default CollectionPage;
