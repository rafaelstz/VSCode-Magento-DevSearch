const vscode = require('vscode');
function activate(context) {
    /**
     * Search in the Magento DevDocs and Magento StackExchange.
     */
    let magentoSearch = new MagentoSearch();

    let disposableDevDocsSearch = vscode.commands.registerCommand("extension.searchDevdocs", () => {
        magentoSearch.searchDevDocs();
    });
    let disposableStackExchangeSearch = vscode.commands.registerCommand("extension.searchStackExchange", () => {
        magentoSearch.searchStackExchange();
    });
    /**
     * Dispose.
     */
    context.subscriptions.push(disposableDevDocsSearch);
    context.subscriptions.push(disposableStackExchangeSearch);
    context.subscriptions.push(magentoSearch);
}
exports.activate = activate;

/**
 * Handles opening of links.
 *
 * @class MagentoSearch
 */
class MagentoSearch {
    constructor() {
    }
    search(website){
        // Get configuration.
        var settings = vscode.workspace.getConfiguration(website);
        // No open text editor.
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        let selection = editor.selection;
        let text = editor.document.getText(selection);
        vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(settings.site + text));
    }
    searchDevDocs() {
        this.search('magentodevdocs');
    }
    searchStackExchange(){
        this.search('magentostackexchange');
    }
    dispose() {
    }
}

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;