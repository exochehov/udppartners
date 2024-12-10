// Add translations table to schema initialization
db.exec(`
  -- Previous tables remain unchanged

  CREATE TABLE IF NOT EXISTS translations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lang_code TEXT NOT NULL,
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(lang_code, key)
  );

  -- Trigger to update updated_at timestamp
  CREATE TRIGGER IF NOT EXISTS update_translations_timestamp 
  AFTER UPDATE ON translations
  BEGIN
    UPDATE translations 
    SET updated_at = CURRENT_TIMESTAMP 
    WHERE id = NEW.id;
  END;
`);