
export type ReviewStatus = 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'POSTED';

export interface LooxReview {
  id: string;
  productName: string;
  customerName: string;
  rating: number;
  reviewText: string;
  customerImageUrl?: string;
  generatedImageUrl?: string;
  generatedCaption: string;
  receivedAt: string;
  status: ReviewStatus;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
  service: string;
}

// Fixed: Added imageUrl to the extractedData interface and added 'ORIENTING' to steps
export interface SimulationResult {
  extractedData: {
    product: string;
    customer: string;
    rating: number;
    text: string;
    reviewUrl: string;
    imageUrl?: string | null;
  } | null;
  caption: string;
  imageUrl: string;
  sourceImageUrl: string | null;
  isProcessing: boolean;
  step: 'IDLE' | 'EXTRACTING' | 'SCRAPING' | 'ORIENTING' | 'IMAGING' | 'WRITING' | 'COMPLETE' | 'ERROR';
  error?: string;
}
