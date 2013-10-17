SOURCES= app.js ui.js 
FLAGS=-c -m --enclose
CC=uglifyjs
TARGET=app.min.js

$(TARGET): $(SOURCES)
	$(CC) $(SOURCES) $(FLAGS) > $@

clean:
	rm -f $(TARGET)
