import { Button } from "@/shared/ui/kit";
import { motion } from "framer-motion";

export const SideBar = () => {
  return (
    <aside className="fixed right-4 top-4 bottom-4 z-40 flex w-[400px] flex-col gap-4 overflow-y-auto pr-1">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="shrink-0 rounded-2xl border border-[var(--ui-border)] bg-[var(--ui-background-secondary)] shadow-xl backdrop-blur-md"
      >
        <div className="p-5">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[var(--ui-accent)] shadow-[0_0_10px_var(--ui-accent)]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ui-text-muted)]">
              Курс
            </span>
          </div>

          <div className="mt-2 text-base font-bold leading-tight text-[var(--ui-text)]">
            JavaScript с нуля
          </div>

          <div className="mt-1 text-xs text-[var(--ui-text-muted)]">
            Изучаемый язык{" "}
            <span className="font-semibold text-[var(--ui-text)]">
              JavaScript
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-xl border border-[var(--ui-border)] bg-[var(--ui-background)] px-4 py-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--ui-text-muted)]">
                Текущий уровень
              </div>

              <div className="mt-1 text-sm font-bold text-[var(--ui-text)]">
                Начинающий
              </div>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--ui-border)] bg-[var(--ui-background-secondary)] text-sm font-black text-[var(--ui-accent)]">
              1
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="shrink-0 rounded-2xl border border-[var(--ui-border)] bg-[var(--ui-background-secondary)] shadow-xl backdrop-blur-md"
      >
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--ui-accent)] text-sm font-black text-white shadow-lg">
              03
            </div>

            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ui-text-muted)]">
                Модуль
              </div>

              <div className="mt-1 text-lg font-bold leading-tight text-[var(--ui-text)]">
                Основы функций
              </div>
            </div>
          </div>

          <div className="mt-3 text-xs leading-relaxed text-[var(--ui-text-muted)]">
            Разберём функции, их создание, вызов и передачу данных.
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="min-h-0 flex-1 overflow-hidden rounded-2xl border border-[var(--ui-border)] bg-[var(--ui-background-secondary)] shadow-xl backdrop-blur-md"
      >
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ui-text-muted)]">
                  Текущий шаг
                </div>

                <div className="mt-1 text-lg font-bold text-[var(--ui-text)]">
                  Название шага
                </div>

                <div className="mt-2 text-sm leading-relaxed text-[var(--ui-text-muted)]">
                  Здесь будет отображаться информация о текущем шаге, описание
                  задания и дополнительные материалы.
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[var(--ui-border)] p-4">
            <Button disabled size="lg" className="w-full">
              Далее
            </Button>
          </div>
        </div>
      </motion.div>
    </aside>
  );
};
