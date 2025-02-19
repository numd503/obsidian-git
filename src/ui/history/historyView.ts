import type { HoverParent, HoverPopover, WorkspaceLeaf } from "obsidian";
import { ItemView } from "obsidian";
import { HISTORY_VIEW_CONFIG } from "src/constants";
import type ObsidianGit from "src/main";
import HistoryViewComponent from "./historyView.svelte";

export default class HistoryView extends ItemView implements HoverParent {
    plugin: ObsidianGit;
    private _view: HistoryViewComponent | undefined;
    hoverPopover: HoverPopover | null;

    constructor(leaf: WorkspaceLeaf, plugin: ObsidianGit) {
        super(leaf);
        this.plugin = plugin;
        this.hoverPopover = null;
    }

    getViewType(): string {
        return HISTORY_VIEW_CONFIG.type;
    }

    getDisplayText(): string {
        return HISTORY_VIEW_CONFIG.name;
    }

    getIcon(): string {
        return HISTORY_VIEW_CONFIG.icon;
    }

    onClose(): Promise<void> {
        this._view?.$destroy();
        return super.onClose();
    }

    reload(): void {
        this._view?.$destroy();
        this._view = new HistoryViewComponent({
            target: this.contentEl,
            props: {
                plugin: this.plugin,
                view: this,
            },
        });
    }

    onOpen(): Promise<void> {
        this.reload();
        return super.onOpen();
    }
}
