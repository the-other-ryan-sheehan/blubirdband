function hideContent(state) {
    
    if (state == "tour") {
        $("#tour").fadeOut(2000);
        $("#dark").removeClass("darker-screen-about");
    }
    else if (state == "about") 
        $("#about").fadeOut(2000);
    else if (state == "merch") 
        $("#merch").fadeOut(2000);
    else if (state == "contact") 
        $("#contact").fadeOut(2000);
}

function updateContent(state) {
    
    if (state == "tour") {
        $("#tour").fadeIn(2000);
        $("#dark").addClass("darker-screen-about");
    }
    else if (state == "about")
        $("#about").fadeIn(2000);
    else if (state == "merch") 
            function pageRedirect() {
                window.location.replace("http://blubirdband.com/merch");
            }      
            setTimeout("pageRedirect()", 2000);
    else if (state == "contact") 
        $("#contact").fadeIn(2000);
}

function footerHandler(state) {
    console.log('running');
    console.log('footer: ' + state);
    if(state == "start" || state =="home") {
        $('#ryan_contact').fadeIn(2000);
    }
    else {
        $('#ryan_contact').fadeOut(2000);
    }
}

var Ribbon = /** @class */ (function () {
    function Ribbon(svg) {
        this.rootPos = Math.random() * 100;
        this.states = {
            start: {
                type: 'start',
                start: { thickness: 0, top: 60, left: 0 },
                end: { thickness: 0, top: 60, left: 100 },
                wave: { amplitude: 0, frequency: 0.008, transitionSpeed: 0.5 }
            },
            home: {
                type: 'home',
                start: { thickness: 30, top: 50, left: 0 },
                end: { thickness: 15, top: 60, left: 100 },
                wave: { amplitude: 40, frequency: 0.015, transitionSpeed: -0.5 }
            },
            tour: {
                type: 'tour',
                start: { thickness: 15, top: 30, left: 0 },
                end: { thickness: 15, top: 30, left: 100 },
                wave: { amplitude: 50, frequency: 0.004, transitionSpeed: 0.01 }
            },
            contact: {
                type: 'contact',
                start: { thickness: 15, top: 80, left: 0 },
                end: { thickness: 24, top: 25, left: 100 },
                wave: { amplitude: 50, frequency: 0.004, transitionSpeed: 0.5 }
            },
            about: {
                type: 'about',
                start: { thickness: 15, top: 90, left: 0 },
                end: { thickness: 14, top: 70, left: 100 },
                wave: { amplitude: 40, frequency: 0.002, transitionSpeed: 0.3 }
            },
            merch: {
                type: 'merch',
                start: { thickness: 250, top: 80, left: 0 },
                end: { thickness: 500, top: 50, left: 100 },
                wave: { amplitude: 10, frequency: 0.0001, transitionSpeed: 0.1 }
            }
        };
        this.size = { svg: { width: window.innerWidth, height: window.innerHeight*1.2 } };
        this.currentState = JSON.parse(JSON.stringify(this.states.start));
        this.rows = 3;
        this.lines = [];
        this.blocks = [];
        this.defaultRestSpeed = 0.009;
        this.speed = {
            changeState: 2,
            rest: 1
        };
        this.waveLineAttr = {
            fill: 'none',
            stroke: 'white',
            strokeWidth: 1
        };
        this.svg = svg;
    }
    Ribbon.prototype.init = function () {
        var _this = this;
        this.blocks = [
            {
                type: 'menu',
                id: '1',
                title: 'Tour',
                position: { current: 105, target: 5, home: 5 },
                width: 13,
                row: 2
            },
            {
                type: 'menu',
                id: '2',
                title: 'About',
                position: { current: 137, target: 27, home: 27 },
                width: 14,
                row: 3
            },
            {
                type: 'menu',
                title: 'Merch',
                id: '3',
                position: { current: 147, target: 47, home: 47 },
                width: 14,
                row: 1
            },
            {
                type: 'menu',
                id: '4',
                title: 'Contact',
                position: { current: 175, target: 75, home: 75 },
                width: 17,
                row: 2
            },
            {
                type: 'back',
                id: 'back',
                title: '<-- Back',
                position: { current: -100, target: -100, home: -100 },
                width: 16,
                row: 1
            }
        ];
        this.ribbon = this.svg.polygon().attr({
            fill: 'url(#grad)',
            stroke: 'none'
        });
        // this.topWaveGuideLine = this.svg.path().attr(this.waveLineAttr);
        // this.bottomWaveGuideLine = this.svg.path().attr(this.waveLineAttr);
        this.resizeSVG();
        this.tick(0);
        this.updateRibbon();
        setTimeout(function () {
            _this.setState(_this.states.home);
        }, 200);
    };
    Ribbon.prototype.updateRibbon = function () {
        var _this = this;
        var freq = this.currentState.wave.frequency;
        var pos = this.rootPos;
        var amp = this.currentState.wave.amplitude;
        var x1 = (this.size.svg.width / 100) * this.currentState.start.left;
        var y1 = ((this.size.svg.height / 100) * this.currentState.start.top);
        var x2 = (this.size.svg.width / 100) * this.currentState.end.left;
        var y2 = (this.size.svg.height / 100) * this.currentState.end.top;
        var t1 = ((this.size.svg.height / 100) * this.currentState.start.thickness) / 2;
        var t2 = ((this.size.svg.height / 100) * this.currentState.end.thickness) / 2;
        this.guidePath = this.getGuidePath(freq, pos, amp, x1, y1, x2, y2);
        var topPathPoints = this.getPathOffset(this.guidePath, -t1, -t2);
        this.paths = [topPathPoints];
        if (this.rows > 1) {
            var startHeightSpace = ((this.size.svg.height / 100) * this.currentState.start.thickness);
            var endHeightSpace = ((this.size.svg.height / 100) * this.currentState.end.thickness);
            for (var i_1 = 1; i_1 < this.rows; i_1++) {
                var startOffset = (0 - (startHeightSpace / 2)) + ((startHeightSpace / this.rows) * i_1);
                var endOffset = (0 - (endHeightSpace / 2)) + ((endHeightSpace / this.rows) * i_1);
                var path = this.getPathOffset(this.guidePath, startOffset, endOffset);
                this.paths.push(path);
                if (!this.lines[i_1 - 1])
                    this.lines.push(this.svg.path().attr(this.waveLineAttr));
                this.lines[i_1 - 1].attr({ d: this.getWavePathString(path) });
            }
        }
        var bottomPath = this.getPathOffset(this.guidePath, t1, t2);
        this.paths.push(bottomPath);
        this.ribbon.attr({ points: this.getWavePolygon(topPathPoints, bottomPath.slice(0).reverse()) });
        for (var i = 0; i < this.blocks.length; i++) {
            var block = this.blocks[i];
            var startX = (this.size.svg.width / 100) * block.position.current;
            var endX = (this.size.svg.width / 100) * (block.position.current + block.width);
            if (startX > this.size.svg.width)
                startX = this.size.svg.width;
            else if (startX < 0)
                startX = 0;
            if (endX > this.size.svg.width)
                endX = this.size.svg.width;
            else if (endX < 0)
                endX = 0;
            var path1 = this.paths[block.row - 1];
            var path2 = this.paths[block.row];
            var chunk1 = path1.slice(startX, endX);
            var chunk2 = path2.slice(startX, endX);
            if (chunk1.length > 1 && chunk2.length > 1) {
                var textPaddingX = 20;
                var textPaddingY = 10;
                var fontSize = 1.75*this.getBlockFontSize(chunk1, chunk2, textPaddingY);
                var boxPolyPoints = this.getWavePolygon(chunk1, chunk2.reverse());
                if (!block.svg) {
                    block.svg = {};
                    block.svg.group = this.svg.group().attr({ "class": 'block', id: block.id });
                    block.svg.group.click(function (e) { _this.onBlockClick(e); });
                    block.svg.box = block.svg.group.polygon().attr({ fill: 'white', stroke: 'none' });
                    block.svg.mask = this.svg.polygon().attr({ fill: 'white', stroke: 'none' }).toDefs();
                    block.svg.textpath = block.svg.group.path().attr({ fill: 'none', stroke: 'white' }).toDefs();
                    block.svg.text = block.svg.group.text(0, 0, block.title).attr({ textpath: block.svg.textpath, mask: block.svg.mask });
                }
                block.svg.box.attr({ points: boxPolyPoints });
                block.svg.mask.attr({ points: boxPolyPoints });
                block.svg.text.attr({ fontSize: fontSize });
                if (endX - startX > textPaddingX * 2) {
                    var newPath = this.getPathOffset(path2.slice(startX + textPaddingX, endX - textPaddingX), -textPaddingY, -textPaddingY);
                    if (newPath.length > 2) {
                        var newPathString = this.getWavePathString(newPath);
                        block.svg.textpath.attr({ d: newPathString });
                    }
                }
            }
            else {
                if (block.svg) {
                    block.svg.group.remove();
                    block.svg.mask.remove();
                    block.svg = null;
                }
            }
        }
    };
    Ribbon.prototype.getGuidePath = function (freq, pos, amp, x1, y1, x2, y2) {
        var points = [];
        var width = x2 - x1;
        var x = x1;
        var y = y1;
        var yChange = y2 - y1;
        while (x++ <= width) {
            y = Math.sin(x * freq + pos);
            points.push([x, (y1 + ((width - (width - x)) * (yChange / width)) + (y * amp / 2 + amp / 2))]);
        }
        return points;
    };
    Ribbon.prototype.getPathOffset = function (points, offsetStart, offsetEnd) {
        if (points.length) {
            var x1 = points[0][0];
            var y1 = points[0][1];
            var x2 = points[points.length - 1][0];
            var y2 = points[points.length - 1][1];
            var yChange = offsetStart - offsetEnd;
            var width = x1 - x2;
            var newPoints = [];
            for (var i = 0; i < points.length; i++) {
                var newPoint = [points[i][0], points[i][1]];
                newPoint[1] += offsetStart + ((width - (width - i)) * (yChange / width));
                newPoints.push(newPoint);
            }
            return newPoints;
        }
        return [];
    };
    Ribbon.prototype.getBlockFontSize = function (topPoints, bottomPoints, padding, maxSize, minSize) {
        if (maxSize === void 0) { maxSize = 30; }
        if (minSize === void 0) { minSize = 10; }
        var startHeight = Math.abs(topPoints[0][1] - bottomPoints[0][1]);
        var endHeight = Math.abs(topPoints[topPoints.length - 1][1] - bottomPoints[bottomPoints.length - 1][1]);
        var space = startHeight < endHeight ? startHeight : endHeight;
        space -= padding * 2;
        if (space < minSize)
            space = minSize;
        if (space > maxSize)
            space = maxSize;
        return space;
    };
    Ribbon.prototype.getWavePathString = function (points) {
        // if(points.length < 2) return '';
        var mapped = _.map(points, function (d) {
            return d.join(',');
        });
        return 'M' + mapped.join(' ');
    };
    Ribbon.prototype.getWavePolygon = function (topPoints, bottomPoints) {
        var allPoints = topPoints.concat(bottomPoints);
        var polyString = '';
        for (var i = 0; i < allPoints.length; i++) {
            polyString += allPoints[i].join(' ') + ' ';
        }
        return polyString;
    };
    Ribbon.prototype.onBlockClick = function (e) {
        var selectedBlock = null;
        for (var i = 0; i < e.path.length; i++) {
            if (e.path[i].nodeName == 'g') {
                selectedBlock = e.path[i].id;
                break;
            }
        }
        if (selectedBlock)
            this.selectBlock(selectedBlock);
    };
    Ribbon.prototype.resizeSVG = function () {
        this.svg.attr({
            width: this.size.svg.width,
            height: this.size.svg.height
        });
    };
    Ribbon.prototype.onResize = function (event) {
        this.size.svg.width = event.target.innerWidth;
        this.size.svg.height = event.target.innerHeight;
        if (this.svg)
            this.resizeSVG();
    };
    Ribbon.prototype.tick = function (c) {
        var _this = this;
        if (c % 2 == 0) {
            // render 30fps
            this.rootPos += this.speed.rest;
            this.updateRibbon();
        }
        requestAnimationFrame(function () {
            _this.tick(c + 1);
        });
    };
    Ribbon.prototype.toggleState = function () {
        this.setState(this.currentState.type == 'home' ? this.states.selected : this.states.home);
    };
    Ribbon.prototype.selectBlock = function (blockId) {
        if (blockId === 'back')
            return this.deselectBlock(this.currentState);
        var selectedBlockPosition = 100;
        for (var i in this.blocks) {
            if (this.blocks[i].id === blockId || this.blocks[i].type === 'back') {
                selectedBlockPosition = this.blocks[i].position.current;
                this.blocks[i].position.target = this.blocks[i].type === 'back' ? 10 : 75;
            }
            else {
                this.blocks[i].position.target = this.blocks[i].position.current < selectedBlockPosition ? this.blocks[i].position.home - 100 : this.blocks[i].position.home + 100;
            }
        }
        // switch to about tour
        if(blockId === '1') 
            this.setState(this.states.tour);
        // switch to about state
        else if(blockId === '2')
            this.setState(this.states.about);
        // switch to merch state
        else if(blockId === '3') 
            this.setState(this.states.merch);
        // switch to contact state
        else if(blockId === '4') 
            this.setState(this.states.contact);
        updateContent(this.currentState.type);
            
    };
    Ribbon.prototype.deselectBlock = function (state) {
        for (var i in this.blocks) {
            this.blocks[i].position.target = this.blocks[i].type == 'menu' ? this.blocks[i].position.home : -100;
        }
        
        if (state.type !== 'start' || state.type !== 'home')
            this.setState(this.states.home);
    };
    Ribbon.prototype.setState = function (newState) {
        
        hideContent(this.currentState.type);

        var transitionSpeed = 2;
        var ease = Power2.easeInOut;
        this.currentState.type = newState.type;
        TweenMax.to(this.currentState.start, this.speed.changeState, { top: newState.start.top, left: newState.start.left, thickness: newState.start.thickness, ease: ease });
        TweenMax.to(this.currentState.end, this.speed.changeState, { top: newState.end.top, left: newState.end.left, thickness: newState.end.thickness, ease: ease });
        TweenMax.to(this.currentState.wave, this.speed.changeState, { amplitude: newState.wave.amplitude, frequency: newState.wave.frequency, ease: ease });
        if (this.currentState.wave.transitionSpeed > this.speed.rest) {
            TweenMax.to(this.speed, this.speed.changeState / 2, { rest: newState.wave.transitionSpeed, ease: Power2.easeIn });
            TweenMax.to(this.speed, this.speed.changeState / 2, { rest: this.defaultRestSpeed, delay: this.speed.changeState / 2, ease: Power2.easeOut });
        }
        else {
            TweenMax.to(this.speed, this.speed.changeState, { rest: this.defaultRestSpeed, ease: ease });
        }
        for (var i = 0; i < this.blocks.length; i++) {
            var block = this.blocks[i];
            if (block.position.current !== block.position.target)
                TweenMax.to(block.position, this.speed.changeState, { current: block.position.target, ease: ease });
        }

        console.log(newState.type);
        footerHandler(newState.type);
        if (newState.type !== "home")
            $("#dark").addClass("darker-screen-override");
        else
            $("#dark").removeClass("darker-screen-override");
        

    };
    return Ribbon;
}());







