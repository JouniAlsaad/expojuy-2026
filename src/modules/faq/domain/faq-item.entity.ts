import type { FaqCategory } from "./faq-category.vo";

export interface FaqItemProps {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
}

export class FaqItem {
  private constructor(private readonly props: FaqItemProps) {}

  static create(props: FaqItemProps): FaqItem {
    return new FaqItem(props);
  }

  get id(): string {
    return this.props.id;
  }

  get question(): string {
    return this.props.question;
  }

  get answer(): string {
    return this.props.answer;
  }

  get category(): FaqCategory {
    return this.props.category;
  }
}
