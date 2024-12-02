const extractJSON = (input: string) => {
  const regex = /{"id":.*?"model":.*?"finish_reason".*?}]}/g;
  const metches = input.match(regex);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const results: any[] = [];
  if (metches && metches.length) {
    metches?.forEach((str) => {
      results.push(JSON.parse(str));
    });
  }
  return results;
};

export const getContent = (input: string) => {
  const matches = extractJSON(input);
  const result = matches
    .map((item) => {
      return item.choices?.[0]?.delta?.content || "";
    })
    .join("");
  return result;
};

export const getChatData = (input: string) => {
  const regex = /{"questionId":.*?,"conversationId":.*?}/g;
  const metches = input.match(regex);
  const results: { questionId: number; conversationId: number }[] = [];
  if (metches && metches.length) {
    metches?.forEach((str) => {
      results.push(JSON.parse(str));
    });
  }
  return results[0];
};
