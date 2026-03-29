"use client";

import {
  Button,
  NotificationType,
  ProgressBar,
  TextareaField,
} from "@/shared/ui/kit";
import { Notification } from "@/shared/ui/kit/notification/notification";
import { useState } from "react";

export default function NotificationDemo() {
  const [notifications, setNotifications] = useState<
    {
      type: NotificationType;
      message: string;
      id: number;
    }[]
  >([]);
  const [lastId, setLastId] = useState(0);

  const [progress, setProgress] = useState(0);

  const showNotification = (type: NotificationType, message: string) => {
    const id = lastId + 1;
    setLastId(id);
    setNotifications([...notifications, { type, message, id }]);
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-[var(--ui-background)] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--ui-text)] mb-8">
          Компонент уведомлений
        </h1>

        {/* Кнопки для вызова уведомлений */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--ui-text-secondary)] mb-4">
            Типы уведомлений
          </h2>
          <div className="flex gap-4 flex-wrap">
            <Button
              variant="primary"
              onClick={() =>
                showNotification("success", "Операция выполнена успешно!")
              }
            >
              Успех
            </Button>
            <Button
              variant="danger"
              onClick={() =>
                showNotification("error", "Произошла ошибка! Попробуйте позже.")
              }
            >
              Ошибка
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                showNotification("info", "Новая версия приложения доступна.")
              }
            >
              Информация
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                showNotification(
                  "warning",
                  "Внимание! Заканчивается место на диске.",
                )
              }
            >
              Предупреждение
            </Button>
          </div>
        </div>

        {/* Уведомления с разным временем */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--ui-text-secondary)] mb-4">
            Разное время авто-закрытия
          </h2>
          <div className="flex gap-4 flex-wrap">
            <Button
              variant="outline"
              onClick={() =>
                showNotification("success", "Закроется через 1 секунду")
              }
            >
              1 секунда
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                showNotification("success", "Закроется через 5 секунд")
              }
            >
              5 секунд
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const id = lastId + 1;
                setLastId(id);
                setNotifications([
                  ...notifications,
                  {
                    type: "success",
                    message: "Не закрывается автоматически (кнопка закрытия)",
                    id,
                  },
                ]);
              }}
            >
              Без авто-закрытия
            </Button>
          </div>
        </div>

        {/* Длинные сообщения */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--ui-text-secondary)] mb-4">
            Длинные сообщения
          </h2>
          <div className="flex gap-4 flex-wrap">
            <Button
              variant="outline"
              onClick={() =>
                showNotification(
                  "info",
                  "Это очень длинное информационное сообщение, которое должно демонстрировать, как компонент уведомлений ведет себя с большим количеством текста. Оно должно корректно переноситься и не ломать верстку.",
                )
              }
            >
              Длинный текст
            </Button>
          </div>
        </div>

        {/* Все уведомления */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--ui-text-secondary)] mb-4">
            Активные уведомления ({notifications.length})
          </h2>
          <div className="space-y-2">
            {notifications.length === 0 ? (
              <p className="text-[var(--ui-text-muted)] text-sm">
                Нет активных уведомлений. Нажми на любую кнопку выше.
              </p>
            ) : (
              notifications.map((notification) => (
                <Notification
                  key={notification.id}
                  type={notification.type}
                  message={notification.message}
                  onClose={() => removeNotification(notification.id)}
                  autoClose={
                    notification.message.includes("секунд") ||
                    !notification.message.includes("закрывается")
                  }
                  autoCloseDelay={
                    notification.message.includes("1 секунд")
                      ? 1000
                      : notification.message.includes("5 секунд")
                        ? 5000
                        : 3000
                  }
                />
              ))
            )}
          </div>
        </div>

        {/* Документация */}
        <div className="mt-8 p-4 rounded-lg border border-[var(--ui-border)] bg-[var(--ui-background-secondary)]">
          <h3 className="text-sm font-semibold text-[var(--ui-text)] mb-2">
            API компонента Notification
          </h3>
          <div className="space-y-2 text-xs text-[var(--ui-text-secondary)]">
            <div>
              <code className="text-[var(--ui-primary)]">type</code> - тип
              уведомления: success | error | info | warning
            </div>
            <div>
              <code className="text-[var(--ui-primary)]">message</code> - текст
              сообщения
            </div>
            <div>
              <code className="text-[var(--ui-primary)]">onClose</code> - колбэк
              при закрытии
            </div>
            <div>
              <code className="text-[var(--ui-primary)]">autoClose</code> -
              автоматическое закрытие (по умолчанию true)
            </div>
            <div>
              <code className="text-[var(--ui-primary)]">autoCloseDelay</code> -
              задержка закрытия в мс (по умолчанию 3000)
            </div>
          </div>
        </div>

        {/* Textarea Field */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--ui-text-secondary)] mb-4">
            Textarea Field
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Обычный */}
            <TextareaField
              inputMode="floating"
              id="textarea-default"
              label="Обычный"
            />

            {/* С variant */}
            <TextareaField
              id="textarea-underlined"
              label="Underlined"
              variant="clean"
            />

            <TextareaField
              id="textarea-error"
              label="С ошибкой"
              error="Поле обязательно для заполнения"
              variant="square"
            />

            {/* Disabled */}
            <TextareaField
              id="textarea-disabled"
              label="Disabled"
              disabled
              value="Этот текст нельзя редактировать"
            />

            {/* С maxLength */}
            <TextareaField
              id="textarea-maxlength"
              label="С ограничением длины"
              maxLength={100}
            />

            {/* autoExpand */}
            <TextareaField
              id="textarea-autoexpand"
              label="Auto Expand"
              autoExpand
              maxRows={100}
            />

            {/* С label и value */}
            <TextareaField
              id="textarea-value"
              label="С значением"
              value="Предзаполненный текст"
              rows={3}
            />

            {/* Floating label */}
            <TextareaField id="textarea-floating" label="Floating Label" />
          </div>
        </div>

        <ProgressBar
          showValue
          value={progress}
          size="lg"
          segments={4}
          state="success"
          variant="segmented-capsule"
          trackVariant="solid"
          label="asdg"
          labelPosition="top-right"
          duration={300}
        />

        <button
          onClick={() => setProgress((prev) => (prev < 100 ? prev + 10 : 0))}
        >
          +
        </button>
      </div>
    </div>
  );
}
