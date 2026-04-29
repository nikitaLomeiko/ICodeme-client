import { AboutEditForm } from "@/features/profile-form";
import {
  Button,
  Card,
  Modal,
  ModalBody,
  Title,
  useNotification,
} from "@/shared/ui/kit";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";

interface IProps {
  about: string;
}

export const AboutView: React.FC<IProps> = ({ about }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const notification = useNotification();

  const handleSuccess = () => {
    setOpen(false);
    notification.success("Информация о себе успешно обновлена");
  };

  return (
    <>
      <Card
        title="О себе"
        headerAction={
          <Button
            variant="ghost"
            size="sm"
            icon={FiEdit2}
            onClick={() => setOpen(true)}
            disableHoverScale
          />
        }
        variant="default"
        padding="md"
        radius="md"
        withHeader={true}
      >
        <Title
          as="p"
          size="sm"
          weight="normal"
          color="default"
          className="leading-relaxed"
        >
          {about || "Информация о себе пока не заполнена"}
        </Title>
      </Card>

      <Modal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        title="Редактировать 'О себе'"
        variant="blur"
        size="full"
        closeOnOverlayClick={true}
        closeOnEsc={true}
        showCloseButton={true}
        withAnimation={true}
      >
        <ModalBody>
          <AboutEditForm
            initAbout={about}
            onCancel={() => setOpen(false)}
            onSuccess={handleSuccess}
          />
        </ModalBody>
      </Modal>
    </>
  );
};
