import api from "@/http";

export type DownloadHistoryItem = {
  id: string;
  date: string;
  data: string;
};

export type DownloadHistoryResponse = {
  items: DownloadHistoryItem[];
  total: number;
};

const USE_MOCK_DOWNLOAD_HISTORY = true;

const mockHistory: DownloadHistoryItem[] = [];

export default class DownloadHistoryService {
  static async getDownloadHistory(
    page: number,
    limit: number
  ): Promise<DownloadHistoryResponse> {
    if (USE_MOCK_DOWNLOAD_HISTORY) {
      const start = (page - 1) * limit;
      const end = start + limit;

      return {
        items: mockHistory.slice(start, end),
        total: mockHistory.length,
      };
    }

    const response = await api.get<DownloadHistoryResponse>("/download-history", {
      params: {
        page,
        limit,
      },
    });

    return response.data;
  }
}