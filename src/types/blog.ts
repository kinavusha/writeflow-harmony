export interface Subsection {
  title: string;
  purpose: string;
  mainPoints: string[];
}

export interface BlogSection {
  title: string;
  subsections: Subsection[];
}

export interface BlogOutline {
  introduction: {
    attention: string;
    interest: string;
    desire: string;
    action: string;
  };
  sections: BlogSection[];
  conclusion: {
    summary: string[];
    cta: string;
  };
}

export interface GenerateOutlineRequest {
  topic: string;
  shortTailKeyword: string;
  longTailKeywords: string[];
}