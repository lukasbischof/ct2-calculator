import { Component, createSignal, onCleanup, Show, Suspense } from 'solid-js';

const Spinner: Component = () => {
  const [isVisible, setIsVisible] = createSignal(false);
  const timer = setTimeout(() => setIsVisible(true), 100);

  onCleanup(() => clearTimeout(timer));

  return (
    <div class="d-flex justify-content-center mt-4">
      <Show when={isVisible()}>
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </Show>
    </div>
  );
};

const useSuspense = (Component: Component) => {
  return () => (
    <Suspense fallback={<Spinner />}>
      <Component />
    </Suspense>
  );
};

export default useSuspense;
