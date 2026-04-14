/**
 * @file /index.js
 * 
 * Landing page logic
 * 
 * @todo Sebbb's display. It needs to fuck though, like it should be neon and should flicker a little bit.
 *  @todo It needs to fuck on mobile as well!!!
 * @todo Subpage previews. Probably just Spotify integration or maybe a blog too.
 * @todo A mini game and Konami Code integration like 2DWillNeverDie
 */

// Game related constants
const UP        = 'w';
const LEFT      = 'a';
const DOWN      = 's';
const RIGHT     = 'd';
const ATTACK    = 'j';
const MOVE_SPEED = 5;

// Game related variables
let player      = document.getElementById("player");
let obstacles   = document.querySelectorAll(".obstacle");
let sword       = document.getElementById("sword");

let curr_keys   = [];
/// @todo Be smarter about this
let can_move_left   = true;
let can_move_right  = true;
let can_move_up     = true;
let can_move_down   = true;
let moving          = false;
let attacking       = false;

let attack_frame_counter = 0;

/**
 * @brief Main game loop
 */
function gameLoop() 
{
    // Check if we're moving at all
    if (
        curr_keys[LEFT] || 
        curr_keys[RIGHT] || 
        curr_keys[UP] || 
        curr_keys[DOWN]
    ) {
        if (!moving) {
            player.setAttribute("moving", true);
            moving = true;
        }
    } else {
        if (moving) {
            player.setAttribute("moving", false);
            moving = false;
        }
    }

    var x_pos = parseInt(player.style.left);
    var y_pos = parseInt(player.style.top);

    // Action handling
    if (curr_keys[LEFT] && can_move_left) player.style.left     = x_pos - MOVE_SPEED + 'px';
    if (curr_keys[RIGHT] && can_move_right) player.style.left   = x_pos + MOVE_SPEED + 'px';
    if (curr_keys[UP] && can_move_up) player.style.top          = y_pos - MOVE_SPEED + 'px';
    if (curr_keys[DOWN] && can_move_down) player.style.top      = y_pos + MOVE_SPEED + 'px';

    check_collisions()

    // Handle attacks
    if (curr_keys[ATTACK]) {
        attacking = true;
    }
    
    if (attacking) {
        attack_frame_counter++;
        if (attack_frame_counter == 1) {
            player.classList.add("attacking")
        }
        if (attack_frame_counter == 10) {
            player.classList.remove("attacking")
        }
        if (attack_frame_counter == 20) { // Endlag
            attacking = false;
            attack_frame_counter = 0;
        }
    }

    window.requestAnimationFrame(gameLoop);
}

// ============================================================================
// Movement helpers

/**
 * @brief Check if two bounding rects are colliding
 * 
 * @param {DOMRect} t_rect_1
 * @param {DOMRect} t_rect_2 
 * 
 * @returns True if they're colliding, false otherwise
 */
function is_colliding(t_rect_1, t_rect_2) 
{
	return !(
		t_rect_1.bottom  < t_rect_2.top ||
		t_rect_1.top     > t_rect_2.bottom ||
		t_rect_1.right   < t_rect_2.left ||
		t_rect_1.left    > t_rect_2.right
	); 
}

/**
 * @brief Check if player is colliding with an 'obstacle' element
 * 
 * This function mutates the can_move_*** variables
 */
function check_collisions() 
{
    // Check bounding box data
    let player_box = player.getBoundingClientRect();
    player_box.bottom   = player_box.top + player_box.height;
    player_box.right    = player_box.left + player_box.width;

    let sword_box = sword.getBoundingClientRect();
    sword_box.bottom   = sword_box.top + sword_box.height;
    sword_box.right    = sword_box.left + sword_box.width;

    let collisions = {};

    obstacles.forEach((obstacle) => {
        // I don't think this is necessary
        // if (!obstacle.classList.contains('obstacle')) { return; }

        let obstacle_box = obstacle.getBoundingClientRect();
        obstacle_box.bottom   = obstacle_box.top + obstacle_box.height;
        obstacle_box.right    = obstacle_box.left + obstacle_box.width;

        if (is_colliding(player_box, obstacle_box))
        {
            // Get distances
            let distance_top    = Math.abs(player_box.bottom - obstacle_box.top);
            let distance_bottom = Math.abs(player_box.top - obstacle_box.bottom);
            let distance_left   = Math.abs(player_box.right - obstacle_box.left);
            let distance_right  = Math.abs(player_box.left - obstacle_box.right);

            let shortest_distance = Math.min(distance_top, distance_right, distance_left, distance_bottom);

            switch (true) {
                case shortest_distance === distance_top:
                    collisions.top = true;
                    break;
                case shortest_distance === distance_bottom:
                    collisions.bottom = true;
                    break;
                case shortest_distance === distance_left:
                    collisions.left = true;
                    break;
                default:
                    collisions.right = true;
            }
        }

        // Check for attacking collisions
        if (
            attacking &&
            attack_frame_counter == 2 && 
            obstacle.classList.contains('enemy') &&
            is_colliding(sword_box, obstacle_box)
        ) {
            obstacle.classList.add("dead");
            obstacle.classList.remove("obstacle");
        }
    });

    if (collisions.top) { can_move_down = false; }
    else { can_move_down = true; }

    if (collisions.bottom) { can_move_up = false; }
    else { can_move_up = true; }

    if (collisions.right) { can_move_left = false; }
    else { can_move_left = true; }

    if (collisions.left) { can_move_right = false; }
    else { can_move_right = true; }
}

// ============================================================================
// Game action event listeners

document.body.addEventListener("keydown", function (event) {
    curr_keys[event.key] = true;
    
    // Exit if not WASD 
    if ([UP, LEFT, DOWN, RIGHT].indexOf(event.key) < 0) {
        return;
    }

    player.setAttribute('keydown-'+event.key, true);
});

document.body.addEventListener("keyup", function (event) {
    curr_keys[event.key] = false;

    // Exit if not WASD 
    if ([UP, LEFT, DOWN, RIGHT].indexOf(event.key) < 0) {
        return;
    }

    player.setAttribute('keydown-'+event.key, '');
    player.setAttribute('facing', event.key);
});

/**
 * @brief Start game loop on-load
 */
window.addEventListener("load", function () {
    gameLoop();
});
