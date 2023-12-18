const importAll = (context) => {
    const keys = context.keys();
    const values = keys.map(context);
    return Object.fromEntries(keys.map((key, index) => [key, values[index]]));
};

export const icons = importAll(require.context('./', false, /\.svg$/));