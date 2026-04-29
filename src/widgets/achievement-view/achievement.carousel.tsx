import { AchievementCard, IAchievement } from "@/entities/achievement";
import { Button, Card, Carousel, CarouselApi } from "@/shared/ui/kit";
import { useRef } from "react";

interface IProps {
  achievements: IAchievement[];
  onAllAchievementsLink: () => void;
}

export const AchievementCarousel: React.FC<IProps> = (props) => {
  const { achievements, onAllAchievementsLink } = props;
  const carouselRef = useRef<CarouselApi>(null);

  return (
    <Card title="Достижения">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => carouselRef.current?.scrollPrev()}
            className="bg-[var(--ui-background-secondary)] text-[var(--ui-text)] hover:bg-[var(--ui-primary)] hover:text-white w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all text-sm"
          >
            ←
          </button>
          <button
            onClick={() => carouselRef.current?.scrollNext()}
            className="bg-[var(--ui-background-secondary)] text-[var(--ui-text)] hover:bg-[var(--ui-primary)] hover:text-white w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all text-sm"
          >
            →
          </button>
        </div>
        <Button variant="primary" size="sm" onClick={onAllAchievementsLink}>
          Все достижения
        </Button>
      </div>

      <Carousel
        ref={carouselRef}
        options={{
          slidesToShow: 4,
          slidesToScroll: 4,
          gap: 4,
          speed: 0.4,
        }}
      >
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </Carousel>
    </Card>
  );
};
