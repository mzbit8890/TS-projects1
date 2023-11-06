class Person {
  private personality: string;

  constructor() {
    this.personality = "Mystery";

  }

  askQuestion(answer: number): void {
    if (answer === 1) {
      this.personality = "Extrovert";
    } else if (answer === 2) {
      this.personality = "Introvert";
    } else if (answer === 3) {
      this.personality = "Embivert"
    } else {
      this.personality = "You are still a Mystery";
    }
  }

  getPersonality(): string {
    return this.personality;
  }
}

export default Person;
