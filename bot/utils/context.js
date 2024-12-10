export class BotContext {
  constructor() {
    this.contexts = new Map();
  }

  set(chatId, data) {
    this.contexts.set(chatId, {
      ...this.contexts.get(chatId),
      ...data,
      timestamp: Date.now()
    });
  }

  get(chatId) {
    const context = this.contexts.get(chatId);
    if (!context) return null;

    // Clear context if it's older than 30 minutes
    if (Date.now() - context.timestamp > 30 * 60 * 1000) {
      this.clear(chatId);
      return null;
    }

    return context;
  }

  clear(chatId) {
    this.contexts.delete(chatId);
  }

  // Clean up old contexts periodically
  cleanup() {
    const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;
    for (const [chatId, context] of this.contexts.entries()) {
      if (context.timestamp < thirtyMinutesAgo) {
        this.clear(chatId);
      }
    }
  }
}

export const context = new BotContext();

// Run cleanup every 5 minutes
setInterval(() => context.cleanup(), 5 * 60 * 1000);