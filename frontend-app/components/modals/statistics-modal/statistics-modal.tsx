import CenteredModalShell from "@/components/modals/shell/shell";
import StatisticsSummary from "@/components/modals/statistics-modal/statistics-summary";
import DistributionGrid from "@/components/modals/statistics-modal/distribution-grid";
import useModals from "@/hooks/modals/use-modals";
import useWordle from "@/hooks/wordle/use-wordle";

export default function StatisticsModal() {
    const { isGameOver } = useWordle();
    const { showStatisticsModal, setShowStatisticsModal } = useModals();
    const handlePlayAgainClick = () => {
        window.location.reload();
    };

    const playAgainButtonEl = isGameOver ? (
        <div className="mt-[20px] flex justify-center">
            <button className="bg-green-500 text-white text-2xl uppercase font-bold px-[10px] py-[4px] rounded-lg" onClick={handlePlayAgainClick}>
                Play Again
            </button>
        </div>
    ) : undefined;

    return (
        <CenteredModalShell showModal={showStatisticsModal} showCloseBox={!isGameOver} onClose={() => setShowStatisticsModal(false)} title="Statistics" footerContent={playAgainButtonEl}>
            <StatisticsSummary />
            <DistributionGrid />
        </CenteredModalShell>
    );
}