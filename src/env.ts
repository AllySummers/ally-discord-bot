const getEnvInternal = () => ({
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    GUILD_ID: process.env.GUILD_ID,
    APP_ID: process.env.APP_ID,
    PUBLIC_KEY: process.env.PUBLIC_KEY,
});

export const getEnv = () => {
    const {
        DISCORD_TOKEN,
        GUILD_ID,
        APP_ID,
        PUBLIC_KEY,
    } = getEnvInternal();
    if (!DISCORD_TOKEN) {
        throw new Error("DISCORD_TOKEN is not set");
    }
    if (!GUILD_ID) {
        throw new Error("GUILD_ID is not set");
    }
    if (!APP_ID) {
        throw new Error("APP_ID is not set");
    }
    if (!PUBLIC_KEY) {
        throw new Error("PUBLIC_KEY is not set");
    }
    return { DISCORD_TOKEN, GUILD_ID, APP_ID, PUBLIC_KEY };
};