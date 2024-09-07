import useModals from "@/app/hooks/use-modals";
import StatisticsIcon from "../icons/statistics-icon";

export default function Statistics() {
    const { setShowStatisticsModal } = useModals();

    return (
        <div
            onClick={() => setShowStatisticsModal(true)}
            className="top-[20px] left-[50px] sm:left-[90px] absolute cursor-pointer"
        >
            <StatisticsIcon />
        </div>
    );
}