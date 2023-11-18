import Framework7 from "framework7/.";
import { Widget } from "rayous";
import { mergeOptions, options, widget } from "rayous/extra";

export interface ViewOptions extends options {

	/**
	 * The app to initiate the view inside
	 */
	app?: Framework7,

	/**
   * View name. If the view was created with a name, it may be accessed via `app.views.[name]`.
   *
   * @type {string}
   * @memberof ViewOptions
   */
  name?: string;

  /**
   * Specify whether this view is the main view or not. If not passed, it will be determined based on whether its element has the `view-main` class or not.
   *
   * @type {boolean}
   * @memberof ViewOptions
   */
  main?: boolean;

  /**
   * Set to `false` to disable the view router.
   *
   * @type {boolean}
   * @memberof ViewOptions
   */
  router?: boolean;

  /**
   * If enabled and the view is a Tab, it won't initialize the router and load the initial page until the view tab becomes visible.
   *
   * @type {boolean}
   * @memberof ViewOptions
   */
  initRouterOnTabShow?: boolean;

  /**
   * Default (initial) View's URL. If not specified, then it is equal to the document URL.
   *
   * @type {string}
   * @memberof ViewOptions
   */
  url?: string;

  /**
   * When enabled and there are no children pages inside the View, it will load the initial page that matches the initial URL.
   *
   * @type {boolean}
   * @memberof ViewOptions
   */
  loadInitialPage?: boolean;

  // ... (continue for the rest of the parameters)

  /**
   * Object with events handlers.
   *
   * @type {object}
   * @memberof ViewOptions
   */
  on?: {
    /**
     * Page initialization event handler.
     *
     * @type {(this: Framework7, page: page) => void}
     * @memberof ViewOptions.on
     */
    pageInit?: (this: Framework7, page: any) => void;
    // ... (add more event handlers as needed)
  };
}


let mainTaken = false;

export class View extends Widget{
	constructor(options: ViewOptions){
		super(mergeOptions({
			class: 'view'
		}, options));
		
		let o: ViewOptions = this.options as any;

		if(o.main && !mainTaken) {
			this.addClass('view-main');
			mainTaken = true;
		} else if(o.main && mainTaken){
			throw new Error("Main view already initiated");
		}
	}

	_onMount(parent: widget): void {
		let app: Framework7 = this.options.app;
		app.views.create(this.raw().at(0), this.options as any);
	}
}