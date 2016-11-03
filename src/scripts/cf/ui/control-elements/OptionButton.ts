/// <reference path="Button.ts"/>

// namespace
namespace cf {
	// interface

	export interface IOptionButtonOptions extends IControlElementOptions{
		isMultiChoice: boolean;
	}

	export const OptionButtonEvents = {
		CLICK: "cf-option-button-click"
	}

	// class
	export class OptionButton extends Button {
		private isMultiChoice: boolean = false;

		public get selected():boolean{
			return this.el.hasAttribute("selected");
		}

		public set selected(value: boolean){
			if(value){
				this.el.setAttribute("selected", "selected");
				// set selected state on option tag
				this.referenceTag.domElement.setAttribute("selected", "selected");
			}else{
				this.el.removeAttribute("selected");
				// remove selected state on option tag
				this.referenceTag.domElement.removeAttribute("selected");
			}
		}

		protected setData(options: IOptionButtonOptions){
			this.isMultiChoice = options.isMultiChoice;
			super.setData(options);
		}

		protected onClick(event: MouseEvent){
			// super.onClick(event);
			ConversationalForm.illustrateFlow(this, "dispatch", OptionButtonEvents.CLICK, this);
			document.dispatchEvent(new CustomEvent(OptionButtonEvents.CLICK, {
				detail: this
			}));
		}

		// override
		public getTemplate () : string {
			let tmpl: string = '<cf-button class="cf-button ' + (this.isMultiChoice ? "cf-checkbox-button" : "") + '" ' + ((<HTMLOptionElement> this.referenceTag.domElement).selected ? "selected='selected'" : "") + '>';

			if(this.isMultiChoice)
				tmpl += "<cf-checkbox></cf-checkbox>";

			tmpl += this.referenceTag.title;
			tmpl += "</cf-button>";

			return tmpl;
		}
	} 
}