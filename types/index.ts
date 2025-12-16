export interface Link {
  id: string;
  shortCode: string;
  originalUrl: string;
  clickCount: number;
  createdAt: Date;
  lastClickedAt: Date | null;
}

export interface CreateLinkRequest {
  originalUrl: string;
}

export interface CreateLinkResponse {
  shortUrl: string;
  shortCode: string;
  originalUrl: string;
}

export interface ApiError {
  error: string;
  details?: string;
}
