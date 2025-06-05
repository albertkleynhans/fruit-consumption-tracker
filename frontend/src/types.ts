export interface FruitEntry {
    date: string;
    fruit: string;
    quantity: number;
}

export interface FruitFormProps {
    onSubmit: (entry: FruitEntry) => void;
}

export interface FruitChartProps {
    entries: FruitEntry[];
} 