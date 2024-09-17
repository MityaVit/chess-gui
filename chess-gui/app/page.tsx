import PositionManager from "./components/PositionManager";
import StoreProvider from "./StoreProvider";

export default function Home() {
  return (
    <div className="flex h-full items-center justify-center h-screen w-screen">
      <StoreProvider>
        <PositionManager />
      </StoreProvider>
    </div>
  );
}
