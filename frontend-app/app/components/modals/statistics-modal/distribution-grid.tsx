import DistributionGridItem from "./distribution-grid-item";

export default function DistributionGrid() {
    return (
        <div className="mt-[20px] px-16 text-xs">
            <DistributionGridItem turn={1} />
            <DistributionGridItem turn={2} />
            <DistributionGridItem turn={3} />
            <DistributionGridItem turn={4} />
            <DistributionGridItem turn={5} />
            <DistributionGridItem turn={6} />
        </div>
    );
}