from abc import ABC, abstractmethod

class AIProvider(ABC):
    @abstractmethod
    def process(self, mode: str, input_path: str, output_path: str) -> None:
        pass