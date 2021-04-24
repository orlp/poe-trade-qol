// ==UserScript==
// @name         PoE trade QOL
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Quality of life for PoE's trade site.
// @author       orlp
// @match        *://www.pathofexile.com/trade/*
// @grant        GM_addStyle
// @require      http://code.jquery.com/jquery-3.5.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    let $ = jQuery;

    GM_addStyle(`
/* Sticky search bar. */
.search-bar:not(.search-advanced), .search-bar .controls  {
    position: sticky;
    z-index: 100;
    background-color: #000000;
    padding-bottom: 2px !important;
}
.search-bar:not(.search-advanced) { top: -8px; }
.search-bar .controls { top: 35px; }

/* Compactify between groups. */
#trade .search-bar .search-advanced-pane.brown .filter-group.expanded:not(.invalid) + .filter-group,
#trade .search-bar .search-advanced-pane.brown > .filter {
    margin-top: 0px !important;
}

#trade .search-bar .search-advanced-pane.brown > .filter.filter-padded {
    margin-top: 15px !important;
}

/* Sticky LHS. */
.search-advanced-items {
    display: flex;
}

.search-advanced-pane.blue {
    flex: 1;
    float: none !important;
}

.search-advanced-pane.brown {
    flex: 1;
    float: none !important;
}

.blue-pane-sticky-wrapper {
    position: sticky;
    top: 70px;
}

/* Hide shit essences. */
div[data-id*="whispering-essence"], div[data-id*="muttering-essence"], div[data-id*="weeping-essence"], div[data-id*="wailing-essence"] {
    display: none;
}

/* Restyle bulk trading. */
.exchange .filter-group-body.dimmed .exchange-filter-item {
    opacity: 1 !important;
}

.exchange-filter-item.highlighted {
    background-color: transparent !important;
    border: 1px solid #40464c !important;
}

.exchange-filter-item.highlighted > img {
    background-color: #595959 !important;
    border: 1px solid #abab5a !important;
}

.exchange-filter-item.active {
    border: 2px dashed #0bb96b !important;
    border-radius: 2px;
    padding: 2px !important;
}
`);

    let should_move_right = {
        "weapon filters": true,
        "armour filters": true,
        "socket filters": true,
        "requirements": true,
        "map filters": true,
        "heist filters": true,
        "ultimatum filters": true,
    };

    let move_right_loop = function() {
        $(".search-advanced-pane.blue > .filter-group").filter(function(index) {
            return should_move_right[$(".filter-title:eq(0)", this).text().toLowerCase()] === true;
        }).appendTo(".search-advanced-pane.brown");

        $(".search-advanced-pane.blue > .filter-group").wrapAll('<div class="blue-pane-sticky-wrapper"></div>');
        setTimeout(move_right_loop, 50);
    };
    setTimeout(move_right_loop, 50);

    let prependFuzzyToTarget = function(e) {
        if (e.target.classList.contains("multiselect__input")) {
            if (!e.target.value.startsWith("~")) {
                e.target.value = "~" + e.target.value;
            }
        }
    };

    document.body.addEventListener("keydown", prependFuzzyToTarget);
})();
