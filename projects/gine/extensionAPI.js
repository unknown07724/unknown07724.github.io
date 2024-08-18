const EngineExtensions = {
    extensions: {},

    registerExtension(extension) {
        if (!extension.name || !extension.initialize) {
            throw new Error("Extensions must have a 'name' and an 'initialize' function.");
        }

        this.extensions[extension.name] = extension;
        extension.initialize();
        console.log(`${extension.name} extension registered.`);
    },

    addObjectProperty(propertyName, defaultValue) {
        GameObject.prototype[propertyName] = defaultValue;
    },

    addGameProperty(propertyName, defaultValue) {
        Game.prototype[propertyName] = defaultValue;
    },

    addMethodToGameObject(methodName, methodFunction) {
        GameObject.prototype[methodName] = methodFunction;
    },

    addMethodToGame(methodName, methodFunction) {
        Game.prototype[methodName] = methodFunction;
    },

    addScriptingLanguage(languageName, compileFunction) {
        if (!languageName || typeof compileFunction !== 'function') {
            throw new Error("A scripting language must have a name and a compile function.");
        }

        // Register the new scripting language
        this.scriptingLanguages = this.scriptingLanguages || {};
        this.scriptingLanguages[languageName] = compileFunction;
    },

    runExtensionMethod(extensionName, methodName, ...args) {
        if (this.extensions[extensionName] && typeof this.extensions[extensionName][methodName] === 'function') {
            return this.extensions[extensionName][methodName](...args);
        } else {
            console.error(`Method ${methodName} not found in extension ${extensionName}`);
        }
    }
};

// Make sure this API is accessible to all extensions
window.EngineExtensions = EngineExtensions;
