/* exported DungeonPlayer */

const DungeonPlayer=function(dungen) {

	const
		TOKENSIZE=25,
		PENCOLORS=[0,{
			color:"#00f",
			composition:"source-over",
			width:1
		},{
			color:"#000",
			composition:"destination-out",
			width:6
		}];

	function getOffset(left,top,node,root) {
		while (node&&(node!==root)) {
			if (node.offsetLeft) {
				left+=node.offsetLeft;
				top+=node.offsetTop;
			}
			node=node.parentNode;
		}

		return {left:left,top:top};
	}

	function moveTokenOver(token,id,node,sheet) {
		const
			offset=getOffset(0,0,sheet,node),
			html=document.documentElement,
			bounds=document.getElementById(id).getBoundingClientRect(),
			dx=(token.offsetWidth-bounds.width)/2,
			dy=(token.offsetHeight-bounds.height)/2;
		token.style.left=(bounds.left+ window.pageXOffset-html.clientLeft-offset.left-dx)+"px";
		token.style.top=(bounds.top+ window.pageYOffset- html.clientTop-offset.top-dy)+"px";
	}

	this.play=function(node) {
		dungen.prepare();
		dungen.createSVG(svg=>{

			// Sheet
			const
				sheet=document.createElement("div");

			sheet.className="sheet";
			sheet.style.display="inline-block";
			sheet.innerHTML=svg.getSVG();
			node.appendChild(sheet);

			// Blackboard
			const
				canvas=document.createElement("canvas"),
				context=canvas.getContext("2d"),
				sheetWidth=sheet.offsetWidth,
				sheetHeight=sheet.offsetHeight;
			let 
				pen=0,
				dragging=0,
				x1,y1;

			canvas.style.position="absolute";
			canvas.style.left=0;
			canvas.style.top=0;
			canvas.width=sheetWidth;
			canvas.height=sheetHeight;
			canvas.oncontextmenu=function() { return false }
			sheet.appendChild(canvas);

			function line(x1,y1,x2,y2,ink) {
				let
					dx=(x2-x1),
					dy=(y2-y1);
				const DELTA=Math.max(Math.abs(dx),Math.abs(dy));
				
				dx/=DELTA;
				dy/=DELTA;

				context.globalCompositeOperation = ink.composition;
				context.fillStyle = ink.color;
				for (let i=0;i<DELTA;i++) {
					context.beginPath();
					context.arc(x1, y1, ink.width, 0, 2 * Math.PI, false);
					context.fill();
					x1+=dx;
					y1+=dy;
				}
			}

			function setDragging(obj) {
				if (dragging) unsetDragging();
				dragging=obj;
				dragging.className+=" dragging";
			}

			function unsetDragging() {
				if (dragging) {
					dragging.className=dragging.className.replace(" dragging","");
					dragging=0;
				}
			}

			function setRolling(obj) {
				unsetDragging(obj);
				obj.className+=" rolling";
			}

			function unsetRolling(obj) {
				obj.className=obj.className.replace(" rolling","");
			}

			canvas.onmousedown=function(e) {
				pen=e.button==2?2:1;
				x1=e.offsetX;
				y1=e.offsetY;
				line(x1,y1,x1,y1,PENCOLORS[pen]);
			}

			canvas.onmousemove=function(e) {
				if (pen) {
					line(x1,y1,e.offsetX,e.offsetY,PENCOLORS[pen]);
					x1=e.offsetX;
					y1=e.offsetY;
				}
			}

			document.onmouseup=function() {
				pen=0;
				unsetDragging();
			}

			function rollDie(die,animation) {
				if (!die.rolling) {
					if (die.unrolltimeout) clearTimeout(die.unrolltimeout);
					setRolling(die);
					die.rolling=true;
					die.rollingStep=50;
					die.style.backgroundColor="#ccc";
					animation=true;
				}
				if (animation) {
					die.rollingStep--;
					if (die.rollingStep) {
						die.innerHTML=1+(die.rollingStep%6);
						setTimeout(()=>{rollDie(die,true)},10);
					} else {						
						die.style.backgroundColor="";
						die.rolling=false;
						die.innerHTML=1+Math.floor(Math.random()*6);
						die.unrolltimeout=setTimeout(e=>{
							die.unrolltimeout=0;
							unsetRolling(die);
						},2000);
					}
				}
			}

			// Dice and tokens

			const tokens=[];

			for (let i=0;i<4;i++) {
				const token=document.createElement("div");
				tokens.push(token);
				token.className="token token-"+i;
				token.style.width=TOKENSIZE+"px"
				token.style.height=TOKENSIZE+"px"
				token.style.lineHeight=TOKENSIZE+"px"
				token.style.position="absolute";				
				token.style.left=700;
				token.style.top=596+(i*(TOKENSIZE+15));
				switch (i) {
					case 0:{
						break;
					}
					case 1:{
						break;
					}
					default:{
						token.innerHTML="?";
						token.onmouseup=function(e) {
							if (e.button==2) rollDie(this);
						}
					}
				}
				token.oncontextmenu=function() { return false }
				sheet.appendChild(token);

				token.onmousedown=function(e) {
					if (!dragging) {
						this._dx=e.offsetX;
						this._dy=e.offsetY;
						setDragging(this);
					}
				}
			}
			document.onmousemove=function(e) {
				if (dragging&&((e.target==canvas)||(e.target==dragging))) {
					const offset=getOffset(e.offsetX,e.offsetY,e.target,dragging.parentNode);
					let
						px=offset.left-dragging._dx,
						py=offset.top-dragging._dy;

					if (px<0) px=0;
					if (py<0) py=0;
					if (px+dragging.offsetWidth>sheetWidth) px=sheetWidth-TOKENSIZE;
					if (py+dragging.offsetHeight>sheetHeight) py=sheetHeight-TOKENSIZE;
					dragging.style.left=px+"px";
					dragging.style.top=py+"px";
					e.preventDefault();
					return false;
				}
			}

			// Place tokens
			moveTokenOver(tokens[0],"map-stairs",node,sheet);
			moveTokenOver(tokens[1],"list-stairs",node,sheet);

		});
	}
}