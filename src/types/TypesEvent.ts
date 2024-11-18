import { Document } from "@contentful/rich-text-types";

export interface EventAsset {
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

export interface EventEntry {
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
    slug: string;
    caption: Document;  // Assuming caption is a rich text field
    poster: {
      sys: {
        type: string;
        linkType: string;
        id: string;
      };
    };
    organizer: string;
    date: string; // Replacing eventDate with date
  };
}

export interface EventResponse {
  sys: {
    type: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: EventEntry[];
  includes: {
    Asset: EventAsset[];
  };
}


// import { Document } from "@contentful/rich-text-types";

// export interface EventAsset {
//   metadata: {
//     tags: string[];
//   };
//   sys: {
//     space: {
//       sys: {
//         type: string;
//         linkType: string;
//         id: string;
//       };
//     };
//     id: string;
//     type: string;
//     createdAt: string;
//     updatedAt: string;
//     environment: {
//       sys: {
//         id: string;
//         type: string;
//         linkType: string;
//       };
//     };
//     revision: number;
//     locale: string;
//   };
//   fields: {
//     title: string;
//     description: string;
//     file: {
//       url: string;
//       details: {
//         size: number;
//         image: {
//           width: number;
//           height: number;
//         };
//       };
//       fileName: string;
//       contentType: string;
//     };
//   };
// }

// export interface EventEntry {
//   metadata: {
//     tags: string[];
//   };
//   sys: {
//     space: {
//       sys: {
//         type: string;
//         linkType: string;
//         id: string;
//       };
//     };
//     id: string;
//     type: string;
//     createdAt: string;
//     updatedAt: string;
//     environment: {
//       sys: {
//         id: string;
//         type: string;
//         linkType: string;
//       };
//     };
//     revision: number;
//     contentType: {
//       sys: {
//         type: string;
//         linkType: string;
//         id: string;
//       };
//     };
//     locale: string;
//   };
//   fields: {
//     title: string;
//     slug: string;
//     caption: Document;  // Assuming caption is a rich text field
//     poster: {
//       sys: {
//         type: string;
//         linkType: string;
//         id: string;
//       };
//     };
//     organizer: string;
//   };
// }

// export interface EventResponse {
//   sys: {
//     type: string;
//   };
//   total: number;
//   skip: number;
//   limit: number;
//   items: EventEntry[];
//   includes: {
//     Asset: EventAsset[];
//   };
// }
