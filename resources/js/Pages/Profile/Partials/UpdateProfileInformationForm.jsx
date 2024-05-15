
import InputLabel from '@/Components/Forms/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/Forms/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import TextAreaInput from '@/Components/Forms/TextAreaInput';
import InputError from '@/Components/Forms/InputError';
import AvatarInput from '@/Components/Forms/AvatarInput';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        country: user.country,
    });

    // Handle the avatar upload and update the avatar URL in the form data
    const handleAvatarUpload = (url) => {
        setData('avatar', url);
    };

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>



                <div>
                    <InputLabel htmlFor="avatar" value="Avatar URL" />
                    <AvatarInput
                        label="Profile Avatar"
                        onUpload={handleAvatarUpload}
                        initialImage={data.avatar}
                        error={errors.avatar}
                    />
                    <InputError message={errors.avatar} />
                </div>

                <div>
                    <TextAreaInput
                        id="bio"
                        name="bio"
                        value={data.bio}
                        onChange={(e) => setData('bio', e.target.value)}
                        placeholder="Describe yourself here..."
                        label="Bio"
                        rows={4}
                        error={errors.bio}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="country" value="Country" />
                    <TextInput
                        id="country"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.country}
                        onChange={(e) => setData('country', e.target.value)}
                        autoComplete="country-name"
                    />
                    <InputError message={errors.country} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
