interface FetchPostProps<T> {
  path: string;
  params?: T
}

export async function fetchIt<T, R>({ path, params }: FetchPostProps<T>): Promise<R | undefined> {
  try {
    const formattedParams = new URLSearchParams(params as unknown as Record<string, string>);
    const res = await fetch(`${path}?${formattedParams}`);
    const data = await res.json();
    return data;  
  } catch (err) {  
    console.error(`Error fetching ${path} : ${err}`);
  }
}
