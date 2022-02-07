HTMLElement.prototype.cls      = function(...names) { this.classList.add(...names); return this; };
HTMLElement.prototype.attr     = function(a, v)     { this.setAttribute(a, v);      return this; };
HTMLElement.prototype.addClick = function(callback) { this.onclick   = callback;    return this; };
HTMLElement.prototype.change   = function(callback) { this.onchange  = callback;    return this; };
HTMLElement.prototype.input    = function(callback) { this.oninput   = callback;    return this; };
HTMLElement.prototype.keydown  = function(callback) { this.onkeydown = callback;    return this; };
HTMLElement.prototype.has      = function(name)     { return this.hasAttribute(name); }
HTMLElement.prototype.set      = function(name, value)
{
    if (value) this.setAttribute(name, "true");
    else this.removeAttribute(name);
    return this;
};

function tag(name, ...children)
{
    let result = document.createElement(name);
    let canUpdate = false;
    for (let i = 0; i < children.length; i++)
    {
        let updateFunction = null;
        let child = children[i];
        if (typeof child === "function")
        {
            updateFunction = child;
            child = child();
        }
        if (!(child instanceof Node))
            child = document.createTextNode(child);
        child.updateFunction = updateFunction;
        result.appendChild(child);
        if (child.canUpdate || updateFunction) canUpdate = true;
    }
    result.canUpdate = canUpdate;
    return result;
}

function update(node)
{
    let updateFunction = node.updateFunction;
    if (updateFunction)
    {
        let parent = node.parentNode;
        let child = updateFunction();
        if (child !== node)
        {
            if (!(child instanceof Node)) child = document.createTextNode(child);
            child.updateFunction = updateFunction;
            parent.insertBefore(child, node);
            parent.removeChild(node);
        }
    }
    for (let child = node.firstChild; child;)
    {
        let next = child.nextSibling;
        if (child.canUpdate !== false || child.updateFunction)
            update(child);
        child = next;
    }
}

for (let name of ["h1", "h2", "h3", "h4", "h5", "h6", "p", "a", "div", "span", "select", "canvas", "button"])
    window[name] = function(...children) { return tag(name, ...children); };

function img   (src)  { return tag("img"  ).attr("src",  src);  }
function input (type) { return tag("input").attr("type", type); }
function option(text, ...args) { return new Option(text, ...args); }
function optgroup(label, ...options) { return tag("optgroup", ...options).attr("label", label); }
function router(routes, routeProvider)
{
    return div(() => 
    {
        let route = routes[routeProvider()] || routes["/404"];
        if (typeof route === "function") route = route();
        return route;
    });
}