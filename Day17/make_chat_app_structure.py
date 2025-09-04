import os

# Define folder structure
structure = {
    "chat-app": {
        "backend": {
            "src": {
                "models": {},
                "routes": {},
                "controllers": {}
            }
        },
        "frontend": {
            "src": {
                "components": {}
            }
        }
    }
}

# Files to create with placeholders
files = {
    "chat-app/backend/package.json": "// backend package.json here",
    "chat-app/backend/tsconfig.json": "// backend tsconfig.json",
    "chat-app/backend/.env.example": "// backend env example",
    "chat-app/backend/src/index.ts": "// backend entrypoint",
    "chat-app/backend/src/app.ts": "// backend app file",
    "chat-app/backend/src/socket.ts": "// backend socket file",
    "chat-app/backend/src/models/User.ts": "// user model",
    "chat-app/backend/src/models/Conversation.ts": "// conversation model",
    "chat-app/backend/src/models/Message.ts": "// message model",
    "chat-app/backend/src/routes/auth.ts": "// auth routes",
    "chat-app/backend/src/routes/messages.ts": "// messages routes",
    "chat-app/backend/src/controllers/messageController.ts": "// controller for messages",

    "chat-app/frontend/package.json": "// frontend package.json",
    "chat-app/frontend/tsconfig.json": "// frontend tsconfig.json",
    "chat-app/frontend/vite.config.ts": "// vite config",
    "chat-app/frontend/tailwind.config.cjs": "// tailwind config",
    "chat-app/frontend/postcss.config.cjs": "// postcss config",
    "chat-app/frontend/index.html": "<!-- index.html -->",
    "chat-app/frontend/src/main.tsx": "// main entry",
    "chat-app/frontend/src/App.tsx": "// app component",
    "chat-app/frontend/src/index.css": "/* styles */",
    "chat-app/frontend/src/api.ts": "// api file",
    "chat-app/frontend/src/types.ts": "// types",
    "chat-app/frontend/src/components/Login.tsx": "// login component",
    "chat-app/frontend/src/components/ChatWindow.tsx": "// chat window",
    "chat-app/frontend/src/components/MessageList.tsx": "// message list"
}

def create_structure(base_path, struct):
    for name, content in struct.items():
        path = os.path.join(base_path, name)
        if isinstance(content, dict):
            os.makedirs(path, exist_ok=True)
            create_structure(path, content)

def create_files():
    for filepath, content in files.items():
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)

if __name__ == "__main__":
    create_structure(".", structure)
    create_files()
    print("✅ Chat app structure created.")
