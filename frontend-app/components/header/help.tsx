import useModals from "@/hooks/modals/use-modals";
import HelpIcon from "@/components/icons/help-icon";

export default function Help() {
    const { setShowHelpModal } = useModals();

    return (
        <div
            onClick={() => setShowHelpModal(true)}
            className="top-[20px] left-[10px] sm:left-[40px] absolute cursor-pointer"
        >
            <HelpIcon />
        </div>
    );
}