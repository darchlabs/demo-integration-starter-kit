export const Sleep = (seconds: number) => new Promise((resolve: any) => setTimeout(() => resolve(), seconds * 1000))
