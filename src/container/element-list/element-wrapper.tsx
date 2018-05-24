import { Element } from '../../components';
import * as React from 'react';
import { ViewStore } from '../../store';

export interface ElementWrapperState {
	highlight?: boolean;
	highlightPlaceholder?: boolean;
}

export interface ElementWrapperProps {
	active?: boolean;
	draggable: boolean;
	dragging: boolean;
	editable?: boolean;
	id: string;
	onClick?: React.MouseEventHandler<HTMLElement>;
	onContextMenu?: React.MouseEventHandler<HTMLElement>;
	onDragDrop?: React.DragEventHandler<HTMLElement>;
	onDragDropForChild?: React.DragEventHandler<HTMLElement>;
	onDragStart?: React.DragEventHandler<HTMLElement>;
	open: boolean;
	title: string;
}

export class ElementWrapper extends React.Component<ElementWrapperProps, ElementWrapperState> {
	public state = {
		open: this.props.open,
		highlightPlaceholder: false,
		highlight: false,
		editTitle: this.props.title
	};

	private handleChange(e: React.FormEvent<HTMLInputElement>): void {
		const target = e.target as HTMLInputElement;
		const store = ViewStore.getInstance();
		const element = store.getNameEditableElement();

		if (element) {
			element.setName(target.value);
		}
	}

	private handleDragDrop(e: React.DragEvent<HTMLElement>): void {
		this.setState({
			highlight: false
		});
		if (typeof this.props.onDragDrop === 'function') {
			this.props.onDragDrop(e);
		}
	}

	private handleDragDropForChild(e: React.DragEvent<HTMLElement>): void {
		this.setState({
			highlightPlaceholder: false
		});
		if (typeof this.props.onDragDropForChild === 'function') {
			this.props.onDragDropForChild(e);
		}
	}

	private handleDragEnter(e: React.DragEvent<HTMLElement>): void {
		this.setState({
			highlight: true
		});
	}

	private handleDragEnterForChild(e: React.DragEvent<HTMLElement>): void {
		this.setState({
			highlightPlaceholder: true
		});
	}

	private handleDragLeave(e: React.DragEvent<HTMLElement>): void {
		this.setState({
			highlight: false
		});
	}

	private handleDragLeaveForChild(e: React.DragEvent<HTMLElement>): void {
		this.setState({
			highlightPlaceholder: false
		});
	}

	private handleDragStart(e: React.DragEvent<HTMLElement>): void {
		this.setState({
			highlight: true
		});
		if (typeof this.props.onDragStart === 'function') {
			this.props.onDragStart(e);
		}
	}

	public render(): JSX.Element {
		const { active, children, title } = this.props;
		return (
			<Element
				active={active}
				dragging={this.props.dragging}
				draggable={this.props.draggable}
				editable={this.props.editable}
				onChange={e => this.handleChange(e)}
				onDragDrop={e => this.handleDragDrop(e)}
				onDragDropForChild={e => this.handleDragDropForChild(e)}
				onDragEnter={e => this.handleDragEnter(e)}
				onDragEnterForChild={e => this.handleDragEnterForChild(e)}
				onDragLeave={e => this.handleDragLeave(e)}
				onDragLeaveForChild={e => this.handleDragLeaveForChild(e)}
				onDragStart={e => this.handleDragStart(e)}
				highlight={this.state.highlight}
				highlightPlaceholder={this.state.highlightPlaceholder}
				id={this.props.id}
				open={this.props.open}
				title={title}
			>
				{children}
			</Element>
		);
	}
}

/* function above(node: EventTarget, selector: string): HTMLElement | null {
	let el = node as HTMLElement;
	let ended = false;

	while (el && !ended) {
		if (el.matches(selector)) {
			break;
		}

		if (el.parentElement !== null) {
			el = el.parentElement;
		} else {
			ended = true;
			break;
		}
	}

	return ended ? null : el;
} */
