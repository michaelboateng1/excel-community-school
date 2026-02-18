{
  /* <script>
	import { Card, Button, Label, Input, Checkbox, Helper } from 'flowbite-svelte';
	import { EnvelopeSolid, LockSolid, EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';
	import schoolLogo from '$lib/assets/schooLogo.png';

	import {onMount} from "svelte";

	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';


	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);
	let rememberMe = $state(false);
	



	function togglePassword() {
		showPassword = !showPassword;
	}

	async function signIn(email, password) {
		const {data, error} = await supabase.auth.signInWithPassword({email, password});
	}

	async function getUserSession(){
		supabase.auth.onAuthStateChange((_event, session) => {
			console.log("Send user to the dash board", session?.user);
			if(session?.user){
				goto("/dashboard");
			}
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();

		signIn(email, password);

		getUserSession();

		email = '';
		password = '';
	}

	onMount(() => {
		getUserSession();
	})
</script> */
}

const Login = () => {
  return (
    <div class="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-900 sm:px-6 lg:px-8">
      <div class="relative w-full max-w-md">
        <div class="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[#0f2a92]/5 blur-3xl lg:h-80 lg:w-80"></div>
        <div class="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-sky-500/5 blur-3xl lg:h-80 lg:w-80"></div>

        <div class="relative z-10 w-full border-none p-10 shadow-2xl">
          <div class="flex flex-col items-center pb-8">
            <div class="mb-4 h-20 w-auto overflow-hidden rounded-xl">{/* <img src={schoolLogo} alt="Spring Side Academy" class="h-full w-full object-contain" /> */}</div>
            <h2 class="text-center text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Welcome Back</h2>
            <p class="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">Sign in to your dashboard account</p>
          </div>

          <form class="space-y-6" method="post">
            <div class="space-y-4">
              <div>
                {/* <Label for="email" class="mb-2 block text-sm font-semibold text-slate-700">
                  Email Address
                </Label> */}
                <input id="email" type="email" placeholder="admin@springside.edu" required class="h-11 border-slate-200 pl-10 bg-slate-50 transition-all focus:border-[#0f2a92] focus:ring-[#0f2a92]/20" />
                {/* {#snippet left()}
								<EnvelopeSolid class="h-5 w-5 text-slate-400" />
							{/snippet} */}
                {/* </Input> */}
              </div>

              <div>
                {/* <Label for="password" class="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </Label> */}
                <div class="relative">
                  <input id="password" type="text" placeholder="ykmzwklop" required class="h-11 pl-10 border-slate-200 bg-slate-50 transition-all focus:border-[#0f2a92] focus:ring-[#0f2a92]/20" />
                  {/* {#snippet left()}
									<LockSolid class="h-5 w-5 text-slate-400" />
								{/snippet}
								{#snippet right()}
									<button
										type="button"
										class="focus:outline-none"
										onclick={togglePassword}
										aria-label={showPassword ? 'Hide password' : 'Show password'}
									>
										{#if showPassword}
											<EyeOutline class="h-5 w-5 text-slate-400 hover:text-slate-600" />
										{:else}
											<EyeSlashOutline class="h-5 w-5 text-slate-400 hover:text-slate-600" />
										{/if}
									</button>
								{/snippet} */}
                  {/* </Input> */}
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between">
              {/* <Checkbox class="text-[#0f2a92] focus:ring-[#0f2a92]">
                <span class="text-sm font-medium text-slate-600">Remember me</span>
              </Checkbox> */}
              <a href="/forgot-password" class="text-sm font-bold text-[#0f2a92] transition-colors hover:text-[#0b1e6b]">
                Forgot password?
              </a>
            </div>

            <Button type="submit" class="relative h-12 w-full overflow-hidden bg-[#0f2a92] font-bold text-white transition-all hover:bg-[#0b1e6b] hover:shadow-lg active:scale-[0.98]">
              Sign In
            </Button>
          </form>

          <div class="mt-8 border-t border-slate-100 pt-6 text-center dark:border-slate-800">
            <p class="text-xs text-slate-400">© {new Date().getFullYear()} Spring Side Academy. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /* <style>
	:global(body) {
		background-color: #f8fafc;
	}
</style> */
}

export default Login;
