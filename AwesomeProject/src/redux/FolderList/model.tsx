export interface DailyFolder {
    id: number;
    name: string;
    caover_image: string;
}

export interface DailyFolderList {
    dailyFolderList: Array<DailyFolder>
}