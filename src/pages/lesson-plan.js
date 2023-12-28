import { useRouter } from 'next/router';

const LessonPlan = () => {
  const router = useRouter();
  const { plan } = router.query;

  console.log('PLAN: ', plan)

  // Make sure we're in the browser and have the plan data
  if (typeof window !== 'undefined' && plan) {
    const lessonPlan = JSON.parse(plan);

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-center text-3xl font-bold mb-6">Generated Lesson Plan</h1>
        <div className="lesson-plan-content">
          {lessonPlan}
        </div>
      </div>
    );
  }

  // Render nothing or a loading state until the plan data is available
  return null;
};

export default LessonPlan;
