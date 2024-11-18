import { Document } from "@contentful/rich-text-types";

// Define TestimoniAsset for assets related to the Testimoni model
export interface TestimoniAsset {
  metadata: {
    tags: string[];
  };
  sys: {
    space: {
      sys: {
        type: string;
        linkType: string;
        id: string;
      };
    };
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: {
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    };
    revision: number;
    locale: string;
  };
  fields: {
    title: string;
    description: string;
    file: {
      url: string;
      details: {
        size: number;
        image: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

// Define TestimoniEntry for each testimonial entry
export interface TestimoniEntry {
  metadata: {
    tags: string[];
  };
  sys: {
    space: {
      sys: {
        type: string;
        linkType: string;
        id: string;
      };
    };
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: {
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    };
    revision: number;
    contentType: {
      sys: {
        type: string;
        linkType: string;
        id: string;
      };
    };
    locale: string;
  };
  fields: {
    title: string;
    fotoPeserta: {
      sys: {
        type: string;
        linkType: string;
        id: string;
      };
    };
    content: Document; // Content of the testimonial
    location: {
      lat: number;
      lon: number;
    };
    date: string; // ISO string format for date and time
    sender: string; // Name or identifier of the sender
    level: string; // e.g., level of satisfaction or status
    slug: string; // Unique identifier for the testimonial URL
  };
}

// Define TestimoniResponse for the API response structure
export interface TestimoniResponse {
  sys: {
    type: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: TestimoniEntry[];
  includes: {
    Asset: TestimoniAsset[];
  };
}
