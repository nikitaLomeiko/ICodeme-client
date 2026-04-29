import { IStudy, PlanItem } from "@/entities/study";
import { LanguageAddForm } from "@/features/profile-form";
import { Card, Modal, ModalBody, useNotification } from "@/shared/ui/kit";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

interface IProps {
  list: IStudy[];
}

export const StudyList: React.FC<IProps> = ({ list }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const notification = useNotification();

  const handleSuccess = () => {
    setOpen(false);
    notification.success("Новый язык программирования успешно добавлен");
  };
  return (
    <>
      <Card
        title="Прогресс обучения"
        headerAction={
          <button
            onClick={() => setOpen(true)}
            className="p-1 rounded-lg text-[var(--ui-primary)] hover:bg-[var(--ui-primary)]/10 transition-all"
          >
            <FaPlus size={18} />
          </button>
        }
      >
        <div className="space-y-3">
          {list.map((study) => (
            <PlanItem onContinue={() => null} study={study} />
          ))}
        </div>
      </Card>

      <Modal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        title="Добавить язык программирования"
        variant="blur"
        size="sm"
        closeOnOverlayClick={true}
        closeOnEsc={true}
        showCloseButton={true}
        withAnimation={true}
      >
        <ModalBody>
          <LanguageAddForm
            onCancel={() => setOpen(false)}
            onSuccess={handleSuccess}
          />
        </ModalBody>
      </Modal>
    </>
  );
};
